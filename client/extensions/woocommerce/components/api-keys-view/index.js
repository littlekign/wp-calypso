/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';

class APIKeysView extends Component {
	static propTypes = {
		onEdit: PropTypes.func.isRequired,
		keys: PropTypes.arrayOf(
			PropTypes.shape( {
				id: PropTypes.string.isRequired,
				label: PropTypes.string,
				placeholder: PropTypes.string,
				value: PropTypes.string
			} )
		),
	}

	renderOneKey = ( key ) => {
		const { onEdit } = this.props;

		return (
			<FormFieldset className="api-keys-view__key-container" key={ key.id }>
				<FormLabel>
					{ key.label }
				</FormLabel>
				<FormTextInput
					name={ key.id }
					onChange={ onEdit }
					value={ key.value }
					placeholder={ key.placeholder } />
			</FormFieldset>
		);
	}

	render = () => {
		const { keys } = this.props;
		if ( 0 >= keys.length ) {
			return null;
		}

		return (
			<div className="api-keys-view__container">
				{ keys.map( ( key ) => this.renderOneKey( key ) ) }
			</div>
		);
	}
}

export default localize( APIKeysView );
