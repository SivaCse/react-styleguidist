import { parse } from 'react-docgen';

import Props, { Code } from 'rsg-components/Props/Props';
import Markdown from 'rsg-components/Markdown';

function render(propTypes) {
	let props = parse(`
		import { Component, PropTypes } from 'react';
		export default class Cmpnt extends Component {
			static propTypes = {
				${propTypes.join(',')}
			}
			render() {
			}
		}
	`);
	return <Props props={props}/>;
}

describe('Props', () => {

	it('should render PropTypes.string', () => {
		let result = render(['color: PropTypes.string']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><span>Optional</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.string.isRequired', () => {
		let result = render(['color: PropTypes.string.isRequired']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.arrayOf', () => {
		let result = render(['colors: PropTypes.arrayOf(PropTypes.string)']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>colors</Code></td>
				<td><Code>string[]</Code></td>
				<td><span>Optional</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render description in Markdown', () => {
		let result = render(['/**\n * Label\n */\ncolor: PropTypes.string']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><span>Optional</span></td>
				<td><div><Markdown text="Label"/></div></td>
			</tr>
		);
	});

});
