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

class SecuritySectionNav extends React.Component {
	static displayName = 'SecuritySectionNav';
	static propTypes = {
		path: PropTypes.string.isRequired,
		translate: PropTypes.func.isRequired,
	};

	getNavtabs = () => {
		const { translate } = this.props;
		const tabs = [
			{
				title: translate( 'Password', { textOnly: true } ),
				path: '/me/security',
			},
			{
				title: translate( 'Two-Step Authentication', { textOnly: true } ),
				path: '/me/security/two-step',
			},
			{
				title: translate( 'Connected Applications', { textOnly: true } ),
				path: '/me/security/connected-applications',
			},
			{
				title: translate( 'Account Recovery', { textOnly: true } ),
				path: '/me/security/account-recovery',
			},
		];

		return tabs;
	};

	getFilteredPath = () => {
		const paramIndex = this.props.path.indexOf( '?' );
		return ( paramIndex < 0 ) ? this.props.path : this.props.path.substring( 0, paramIndex );
	};

	getSelectedText = () => {
		let text = '';
		const filteredPath = this.getFilteredPath();
		const found = find( this.getNavtabs(), { path: filteredPath } );

		if ( 'undefined' !== typeof found ) {
			text = found.title;
		}

		return text;
	};

	onClick = () => {
		window.scrollTo( 0, 0 );
	};

	render() {
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
}

export default localize( SecuritySectionNav );
