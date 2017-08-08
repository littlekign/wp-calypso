/**
 * External dependencies
 */
import React, { PureComponent } from 'react';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import EmbedDialog from 'components/tinymce/plugins/wpcom-view/views/embed/embed-dialog/';

class EmbedDialogExample extends PureComponent {
	state = { showDialog: false };

	openDialog  = () => this.setState( { showDialog: true  } );
	handleClose = () => this.setState( { showDialog: false } );

	render() {
		return (
			<Card>
				<Button onClick={ this.openDialog }>Open Embed Dialog</Button>
				<EmbedDialog
					embedUrl={ 'https://youtube.com/watch/foo' }
					isVisible={ this.state.showDialog }
					onClose={ this.handleClose }
				/>
			</Card>
		);
	}
}

export default EmbedDialogExample;
