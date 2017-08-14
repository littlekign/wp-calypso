/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import PopoverMenuItem from 'components/popover/menu-item';
import { mc } from 'lib/analytics';
import { getPost } from 'state/posts/selectors';
import config from 'config';

class PostActionsEllipsisMenuShare extends Component {
	static propTypes = {
		globalId: PropTypes.string,
		translate: PropTypes.func.isRequired,
		status: PropTypes.string,
		onToggleShare: PropTypes.func.isRequired,
	};

	constructor() {
		super( ...arguments );

		this.sharePost = this.sharePost.bind( this );
	}

	sharePost() {
		mc.bumpStat( 'calypso_cpt_actions', 'share' );
		this.props.onToggleShare();
	}

	render() {
		const { translate, status } = this.props;
		if ( ! config.isEnabled( 'posts/post-type-list' ) || ! includes( [ 'publish' ], status ) ) {
			return null;
		}

		return (
			<PopoverMenuItem onClick={ this.sharePost } icon="share">
				{ translate( 'Share' ) }
			</PopoverMenuItem>
		);
	}
}

export default connect(
	( state, ownProps ) => {
		const post = getPost( state, ownProps.globalId );
		if ( ! post ) {
			return {};
		}

		return {
			status: post.status,
		};
	}
)( localize( PostActionsEllipsisMenuShare ) );
