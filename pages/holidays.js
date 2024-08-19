import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const pageSize = 10;

  const router = useRouter();

  const updateQuery = (key, value) => {
    const newQuery = { ...router.query, [key]: value };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const {
    province = "All",
    year = "2024",
    search = "",
    page = "1",
  } = router.query;

  const [holidays, setHolidays] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHolidays = async () => {
    try {
      const url =
        province === "All"
          ? "https://canada-holidays.ca/api/v1/holidays"
          : `https://canada-holidays.ca/api/v1/provinces/${province}`;
      const res = await fetch(`${url}?year=${year}`);
      const data = await res.json();
      setHolidays(data.holidays || data.province.holidays);
      setTotalPages(
        Math.ceil((data.holidays || data.province.holidays).length / pageSize),
      );
    } catch (error) {
      console.error("Failed to fetch holidays:", error);
    } finally {
    }
  };

  const filteredHolidays = useMemo(() => {
    return holidays
      .filter(({ nameEn }) =>
        nameEn.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(parseInt(page) * pageSize - pageSize, parseInt(page) * pageSize);
  }, [holidays, page, search]);

  useEffect(() => {
    fetchHolidays();
  }, [year, province]);

  return (
    <div>
      <h1>Canada Holidays</h1>
      <input
        type="text"
        id="holiday-search"
        placeholder="Search holidays"
        value={search}
        onChange={(e) => updateQuery("search", e.target.value)}
      />
      <label htmlFor="year-filter">Year</label>
      <select
        id="year-filter"
        onChange={(e) => updateQuery("year", e.target.value)}
        value={year}
      >
        {Array.from({ length: 11 }, (_, i) => {
          const yearOption = 2020 + i;
          return (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          );
        })}
      </select>
      <label htmlFor="province-filter">Province</label>
      <select
        id="province-filter"
        onChange={(e) => updateQuery("province", e.target.value)}
        value={province}
      >
        {[
          "All",
          "AB",
          "BC",
          "MB",
          "NB",
          "NL",
          "NS",
          "ON",
          "PE",
          "QC",
          "SK",
          "NT",
          "NU",
          "YT",
        ].map((provinceCode) => (
          <option key={provinceCode} value={provinceCode}>
            {provinceCode}
          </option>
        ))}
      </select>
      <table id="holidays-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Name (FR)</th>
            <th>Province(s)</th>
          </tr>
        </thead>
        <tbody>
          {filteredHolidays.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.date}</td>
              <td>{holiday.nameEn}</td>
              <td>{holiday.nameFr}</td>
              <td>
                {holiday.federal
                  ? "Federal"
                  : holiday.provinces
                      ?.map((province) => province.id)
                      .join(" ") ?? province}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        id="prev-page"
        onClick={() => updateQuery("page", Math.max(parseInt(page) - 1, 1))}
      >
        Previous
      </button>
      <button
        id="next-page"
        onClick={() =>
          updateQuery("page", Math.min(parseInt(page) + 1, totalPages))
        }
      >
        Next
      </button>
    </div>
  );
}

