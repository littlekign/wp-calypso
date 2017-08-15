/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { find } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import NavItem from 'components/section-nav/item';
import NavTabs from 'components/section-nav/tabs';
import SectionNav from 'components/section-nav';

module.exports = React.createClass( {
	propTypes: {
		path: React.PropTypes.string.isRequired
	},

	getNavtabs: function() {
		var tabs = [
			{
				title: i18n.translate( 'Password', { textOnly: true } ),
				path: '/me/security',
			},
			{
				title: i18n.translate( 'Two-Step Authentication', { textOnly: true } ),
				path: '/me/security/two-step',
			},
			{
				title: i18n.translate( 'Connected Applications', { textOnly: true } ),
				path: '/me/security/connected-applications',
			},
			{
				title: i18n.translate( 'Account Recovery', { textOnly: true } ),
				path: '/me/security/account-recovery',
			},
		];

		return tabs;
	},

	getFilteredPath: function() {
		var paramIndex = this.props.path.indexOf( '?' );
		return ( paramIndex < 0 ) ? this.props.path : this.props.path.substring( 0, paramIndex );
	},

	getSelectedText: function() {
		var text = '',
			filteredPath = this.getFilteredPath(),
			found = find( this.getNavtabs(), { path: filteredPath } );

		if ( 'undefined' !== typeof found ) {
			text = found.title;
		}

		return text;
	},

	onClick: function() {
		window.scrollTo( 0, 0 );
	},

	render: function() {
		return (
			<SectionNav selectedText={ this.getSelectedText() }>
				<NavTabs>
					{ this.getNavtabs().map( function( tab ) {
						return (
							<NavItem
								key={ tab.path }
								onClick={ this.onClick }
								path={ tab.path }
								selected={ tab.path === this.getFilteredPath() }
							>
								{ tab.title }
							</NavItem>
						);
					}, this ) }
				</NavTabs>
			</SectionNav>
		);
	}
} );
