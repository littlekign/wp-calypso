/**
 * External dependencies
 */
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import { decodeEntities, stripHTML } from 'lib/formatting';

class OrderNote extends Component {
	static propTypes = {
		customer_note: PropTypes.bool,
		date_created: PropTypes.string,
		date_created_gmt: PropTypes.string,
		id: PropTypes.number,
		note: PropTypes.string,
	}

	render() {
		const {
			customer_note,
			date_created,
			note,
			moment,
			translate
		} = this.props;

		// @todo Add comment author once we have that info
		let icon = 'aside';
		let note_type = translate( 'Internal note' );
		if ( customer_note ) {
			icon = 'mail';
			note_type = translate( 'Note sent to customer' );
		}

		return (
			<div className="order-notes__note">
				<div className="order-notes__note-meta">
					<span className="order-notes__note-time">{ moment( date_created ).format( 'LT' ) }</span>
					<Gridicon icon={ icon } size={ 24 } />
				</div>
				<div className="order-notes__note-body">
					<div className="order-notes__note-type">{ note_type }</div>
					<div className="order-notes__note-content">
						{ decodeEntities( stripHTML( note ) ) }
					</div>
				</div>
			</div>
		);
	}
}

export default localize( OrderNote );
