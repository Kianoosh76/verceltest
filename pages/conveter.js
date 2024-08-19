import React from 'react';

class Text extends React.Component {
	render() {
		return <h1 style={{color: 'red'}}>{this.props.children}<br /></h1>
	}
}

const ConversionLogic = {
	CelsiusToFahrenheit: (celsius) => celsius * 1.8 + 32,
	FahrenheitToCelsius: (fahrenheit) => (fahrenheit) - 32 / 1.8,
	KelvinToCelsius: (kelvin) => kelvin - 273.15,
	CelsiusToKelvin: (celsius) => celsius + 273.15,
	FahrenheitToKelvin: (fahrenheit) => (fahrenheit - 32) * 5 / 9 + 273.15,
	KelvinToFahrenheit: (kelvin) => (kelvin - 273.15) * 9 / 5 + 32,
	MeterToFeet: (meter) => meter * 3.28084,
	FeetToMeter: (feet) => feet / 3.28084,
	'Square FeetToSquare Meter': (squareFeet) => squareFeet / 10.7639,
	'Square MeterToSquare Feet': (squareMeter) => squareMeter * 10.7639,
	KilogramToPound: (kilogram) => kilogram * 2.20462,
	PoundToKilogram: (pound) => pound / 2.20462
}

const availableUnits = {
	temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
	length: ['Meter', 'Feet'],
	weight: ['Kilogram', 'Pound'],
	area: ['Square Meter', 'Square Feet'],
}

class Dropdown extends React.Component {
	render() {
		const {id, value, onChange, options} = this.props;
		return (
			<select id={id} onChange={e => onChange(e.target.value)} style={{height: 30, width: 200, margin: 8, fontSize: '1rem'}}
			>
			{options.map(option =>
				<option key={option} value={option} selected={value === option}>{option}</option>
			)}
			</select>
		);
	}
}

class ConverterInput extends React.Component {
	render() {
		const {inputId, inputValue, inputOnChange, unitId, unitValue, unitOptions, unitOnChange} = this.props;
		return (
			<>
			<Dropdown id={unitId} value={unitValue} onChange={unitOnChange} options={unitOptions} />
			<input
			type="text"
			id={inputId}
			value={inputValue}
			onChange={event => inputOnChange(event.target.value)}
			style={{height: 40, width: 200, fontSize: '2rem'}}
			/>
			</>
		)
	}
}

class Converter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'temperature',
			lhsValue: '',
			rhsValue: '',
			lhsUnit: 'Celsius',
			rhsUnit: 'Fahrenheit',
		}
	}

	update = isLhs => value => {
		if (isLhs) {
			this.setState({
				...this.state,
				lhsValue: Number(value),
				rhsValue: ConversionLogic[this.state.lhsUnit + 'To' + this.state.rhsUnit](Number(value)),
			})
		} else {
			this.setState({
				...this.state,
				rhsValue: Number(value),
				lhsValue: ConversionLogic[this.state.rhsUnit + 'To' + this.state.lhsUnit](Number(value)),
			})
		}
	}

	typeChange = type => {
		this.setState({lhsValue: '', rhsValue: '', type, lhsUnit: availableUnits[type][0], rhsUnit: availableUnits[type][1]})
	}

	unitChange = isLhs => unit => {
		if (isLhs) {
			this.setState({
				...this.state,
				lhsUnit: unit,
				rhsUnit: this.state.rhsUnit !== unit ? this.state.rhsUnit : availableUnits[this.state.type].filter(u => u !== unit)[0],
			})
		} else {
			this.setState({
				...this.state,
				rhsUnit: unit,
				lhsUnit: this.state.rhsUnit !== unit ? this.state.rhsUnit : availableUnits[this.state.type].filter(u => u !== unit)[0],
			})

		}
	}

	render() {
		return (
			<>
			<Dropdown id="conversion-type" value={this.state.type} onChange={this.typeChange} options={Object.keys(availableUnits)} />
			<br />
			<ConverterInput
			inputId='lhs-input'
			inputValue={this.state.lhsValue}
			inputOnChange={this.update(true)}
			unitId='lhs-unit'
			unitValue={this.state.lhsUnit}
			unitOptions={availableUnits[this.state.type]}
			unitOnChange={this.unitChange(true)}
			/>
			<ConverterInput
			inputId='rhs-input'
			inputValue={this.state.rhsValue}
			inputOnChange={this.update(false)}
			unitId='rhs-unit'
			unitValue={this.state.rhsUnit}
			unitOptions={availableUnits[this.state.type].filter(unit => unit !== this.state.lhsUnit)}
			unitOnChange={this.unitChange(false)}
			/>
			</>
		)
	}
}

export default Converter;
