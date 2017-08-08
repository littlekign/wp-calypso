/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card';
import FormFieldset from 'components/forms/form-fieldset';
import FormButton from 'components/forms/form-button';
import FormLabel from 'components/forms/form-label';
import ReduxFormTextarea from 'components/redux-forms/redux-form-textarea';
import ReduxFormTextInput from 'components/redux-forms/redux-form-text-input';
import SectionHeader from 'components/section-header';

const form = 'extensions.zoninator.zoneDetails';

const ZoneDetailsForm = ( {
	handleSubmit,
	label,
	onSubmit,
	submitting,
} ) => {
	const save = data => onSubmit( form, data );

	return (
		<form onSubmit={ handleSubmit( save ) }>
			<SectionHeader label={ label }>
				<FormButton
					compact
					disabled={ submitting }
					isSubmitting={ submitting }>
					{ translate( 'Save' ) }
				</FormButton>
			</SectionHeader>
			<CompactCard>
				<FormFieldset>
					<FormLabel htmlFor="name">{ translate( 'Zone name' ) }</FormLabel>
					<ReduxFormTextInput name="name" />
				</FormFieldset>

				<FormFieldset>
					<FormLabel htmlFor="description">{ translate( 'Zone description' ) }</FormLabel>
					<ReduxFormTextarea name="description" />
				</FormFieldset>
			</CompactCard>
		</form>
	);
};

ZoneDetailsForm.propTypes = {
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

const createReduxForm = reduxForm( {
	form,
	validate: ( data ) => {
		const errors = {};

		if ( ! data.name ) {
			errors.name = translate( 'Zone name cannot be empty.' );
		}

		return errors;
	},
} );

export default createReduxForm( ZoneDetailsForm );
