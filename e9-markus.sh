#!/bin/bash

TESTER_NAME="frontend.test.js"
TOTAL_TESTS_DEFAULT=10


# Function to get the current time in milliseconds
get_time_ms() {
  if command -v gdate >/dev/null 2>&1; then
    # Use GNU date (gdate) if available on macOS
    echo $(($(gdate +%s%N)/1000000))
  elif command -v date >/dev/null 2>&1; then
    # Use date on Ubuntu (assuming it supports %N for nanoseconds)
    echo $(($(date +%s%N)/1000000))
  else
    # Fallback to using Python
    python -c 'import time; print(int(time.time() * 1000))'
  fi
}

# Install dependencies
npm install
npm install --save-dev jest puppeteer
rm -rf ./tests
npm run dev &
server_pid=$!

sleep 5

# Define a cleanup function to kill the server
cleanup() {
  echo "Killing server process..."
    kill $server_pid

  # Find and kill the process using the specified port
  server_process_pid=$(lsof -t -i:3000)
  if [ -n "$server_process_pid" ]; then
    kill -9 $server_process_pid
    echo "Killed process running on port $port (PID: $server_process_pid)"
  fi

}

# Set the trap to call the cleanup function on EXIT, INT, or TERM signals
trap cleanup EXIT INT TERM


# Start the timer
start_time=$(get_time_ms)

# Set up and run the tester
echo "Running tests..."
test_output=$(npx jest 2>&1)

# Calculate the time taken in milliseconds
end_time=$(get_time_ms)
time_taken=$((end_time - start_time))

# Extract the relevant lines immediately following "Test Suites:"
results_block=$(echo "$test_output" | awk '/Test Suites:/ {flag=1; next} /[^[:space:]]/ && flag {print; count++} count==1 {flag=0}')

# Extract the number of passed and failed tests
tests_passed=$(echo "$results_block" | awk '{for(i=1;i<=NF;i++) if($i ~ /passed/) print $(i-1)}')
tests_failed=$(echo "$results_block" | awk '{for(i=1;i<=NF;i++) if($i ~ /failed/) print $(i-1)}')

# Set default values if the lines are missing in the output
if [ -z "$tests_passed" ]; then
  tests_passed=0
fi

if [ -z "$tests_failed" ]; then
  tests_failed=0
fi

# Calculate total tests, ensuring it's at least $TOTAL_TESTS_DEFAULT
total_tests=$((tests_passed + tests_failed))
if [ "$total_tests" -lt "$TOTAL_TESTS_DEFAULT" ]; then
  total_tests=$TOTAL_TESTS_DEFAULT
fi

# Calculate the earned marks (assuming 1 mark per test passed)
marks_earned=$tests_passed
marks_total=$total_tests

# Determine the status based on the points earned
if [ "$marks_earned" -eq "$marks_total" ]; then
  status="pass"
elif [ "$marks_earned" -eq 0 ]; then
  status="fail"
elif [ "$marks_earned" -lt "$marks_total" ]; then
  status="partial"
else
  status="error"
fi

# Output in the Markus format
echo "{\"name\": \"Assignment 1 Auto-tester\",
\"output\": \"$test_output\",
\"marks_earned\": $marks_earned,
\"marks_total\": $marks_total,
\"status\": \"$status\",
\"time\": $time_taken}"
