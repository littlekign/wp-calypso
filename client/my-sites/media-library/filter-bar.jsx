/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import {
	identity,
	includes,
	noop,
	pull,
} from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import SectionNav from 'components/section-nav';
import SectionNavTabs from 'components/section-nav/tabs';
import Search from 'components/search';
import TrackComponentView from 'lib/analytics/track-component-view';
import PlanStorage from 'blocks/plan-storage';
import FilterItem from './filter-item';
import TitleItem from './title-item';

export class MediaLibraryFilterBar extends Component {
	static propTypes = {
		basePath: PropTypes.string,
		enabledFilters: PropTypes.arrayOf( PropTypes.string ),
		filter: PropTypes.string,
		filterRequiresUpgrade: PropTypes.bool,
		search: PropTypes.string,
		source: PropTypes.string,
		site: PropTypes.object,
		onFilterChange: PropTypes.func,
		onSearch: PropTypes.func,
		translate: PropTypes.func,
		post: PropTypes.bool,
		isConnected: PropTypes.bool,
	};

	static defaultProps ={
		filter: '',
		basePath: '/media',
		onFilterChange: noop,
		onSearch: noop,
		translate: identity,
		source: '',
		post: false,
		isConnected: true,
	};

	getSearchPlaceholderText() {
		const { filter, translate } = this.props;
		switch ( filter ) {
			case 'this-post':
				return translate( 'Search media uploaded to this post…' );
			case 'images':
				return translate( 'Search images…' );
			case 'audio':
				return translate( 'Search audio files…' );
			case 'videos':
				return translate( 'Search videos…' );
			case 'documents':
				return translate( 'Search documents…' );
			default:
				return translate( 'Search all media…' );
		}
	}

	getFilterLabel( filter ) {
		const { translate } = this.props;

		switch ( filter ) {
			case 'this-post':
				return translate( 'This Post', { comment: 'Filter label for media list' } );
			case 'images':
				return translate( 'Images', { comment: 'Filter label for media list' } );
			case 'audio':
				return translate( 'Audio', { comment: 'Filter label for media list' } );
			case 'videos':
				return translate( 'Videos', { comment: 'Filter label for media list' } );
			case 'documents':
				return translate( 'Documents', { comment: 'Filter label for media list' } );
			default:
				return translate( 'All', { comment: 'Filter label for media list' } );
		}
	}

	isFilterDisabled( filter ) {
		const { enabledFilters } = this.props;
		return enabledFilters && ( ! filter.length || ! includes( enabledFilters, filter ) );
	}

	changeFilter = filter => {
		this.props.onFilterChange( filter );
	};

	renderSectionTitle() {
		const { translate } = this.props;

		if ( this.props.source === 'google_photos' ) {
			return <TitleItem>{ translate( 'Recent photos from Google' ) }</TitleItem>;
		}

		return null;
	}

	renderTabItems() {
		if ( this.props.source !== '' ) {
			return null;
		}

		const tabs = [ '', 'this-post', 'images', 'documents', 'videos', 'audio' ];

		if ( ! this.props.post ) {
			pull( tabs, 'this-post' );
		}

		return (
			<SectionNavTabs>
				{
					tabs.map( filter =>
						<FilterItem
							key={ 'filter-tab-' + filter }
							value={ filter }
							selected={ this.props.filter === filter }
							onChange={ this.changeFilter }
							disabled={ this.isFilterDisabled( filter ) }
						>
							{ this.getFilterLabel( filter ) }
						</FilterItem>
					)
				}
			</SectionNavTabs>
		);
	}

	renderSearchSection() {
		if ( this.props.filterRequiresUpgrade || ! this.props.isConnected ) {
			return null;
		}

		return (
			<Search
				analyticsGroup="Media"
				pinned
				fitsContainer
				onSearch={ this.props.onSearch }
				initialValue={ this.props.search }
				placeholder={ this.getSearchPlaceholderText() }
				delaySearch={ true } />
		);
	}

	renderPlanStorage() {
		const eventName = 'calypso_upgrade_nudge_impression';
		const eventProperties = { cta_name: 'plan-media-storage' };
		return (
			<PlanStorage siteId={ this.props.site.ID }>
				<TrackComponentView eventName={ eventName } eventProperties={ eventProperties } />
			</PlanStorage>
		);
	}

	render() {
		// Dropdown is disabled when viewing any external data source
		return (
			<div className="media-library__filter-bar">
				<SectionNav
					selectedText={ this.getFilterLabel( this.props.filter ) }
					hasSearch={ true }
					allowDropdown={ ! this.props.source }
				>
					{ this.renderSectionTitle() }
					{ this.renderTabItems() }
					{ this.renderSearchSection() }
				</SectionNav>

				{ this.renderPlanStorage() }
			</div>
		);
	}
}

export default localize( MediaLibraryFilterBar );
