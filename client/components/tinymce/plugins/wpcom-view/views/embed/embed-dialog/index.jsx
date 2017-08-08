/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */
import Dialog from 'components/dialog';
import Button from 'components/button';
import FormTextInput from 'components/forms/form-text-input';

import EmbedView from 'components/tinymce/plugins/wpcom-view/views/embed/view';
import ResizableIframe from 'components/resizable-iframe';

class EmbedDialog extends Component {
	static propTypes = {
		isVisible: PropTypes.bool,
		embedUrl: PropTypes.string,
	};

	static defaultProps = {
		isVisible: false,
		embedUrl: '',
	};

	state = {
		embedUrl: this.props.embedUrl,
	};

	onUpdateEmbed = ( event ) => {
		console.log('on update');
		// set to state. this.embedUrl ?
		// update tinymce content w/ state.embedUrl & re-render the embed inside the tinymce component
		this.props.onClose();
	};

	onChangeEmbedUrl = ( event ) => {
		this.setState( { embedUrl: event.target.value } );
		// re-reder preview - should happen automatically
		// need to debounce or something so not every single second
	};

	render() {
		return (
			<Dialog
				isVisible={ this.props.isVisible }
				onClose={ this.props.onClose }
				buttons={ [
					<Button onClick={ this.props.onClose }>
						Cancel
					</Button>,
					<Button primary onClick={ this.onUpdateEmbed }>
						Update
					</Button>
				] }
			>
				<h3>Embed URL</h3>

				<FormTextInput
					defaultValue={ this.state.embedUrl }
					onChange={ this.onChangeEmbedUrl }
				/>

				<EmbedView src={ this.state.embedUrl } />
				<ResizableIframe src={ this.state.embedUrl } frameBorder="0" seamless width="100%" />
			</Dialog>
		);
		{/* security issue above with src="user input", need to use wpcom oembed provider whitelist.
		ALSO WANT iframe sandbox params etc?
		also need to transform to canonical embeddable URL. youtube will block main url via x-frame-options, have to use `/embed/{id}` url
		*/}
	}
}

export default EmbedDialog;
