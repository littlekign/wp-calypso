/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getEditorPath } from 'state/ui/editor/selectors';
import { getNormalizedPost } from 'state/posts/selectors';
import Card from 'components/card';
import PostRelativeTime from 'blocks/post-relative-time';
import PostStatus from 'blocks/post-status';
import PostTypeListPostThumbnail from 'my-sites/post-type-list/post-thumbnail';
import PostActionsEllipsisMenu from 'my-sites/post-type-list/post-actions-ellipsis-menu';
import PostTypePostAuthor from 'my-sites/post-type-list/post-type-post-author';

class PostItem extends React.Component {

	constructor( props ) {
		super( props );
		this.state = { showShare: false };
	}

	toggleShare = () => {
		this.setState( { showShare: ! this.state.showShare } );
	}

	render() {
		const title = this.props.post ? this.props.post.title : null;
		const classes = classnames( 'post-item', this.props.className, {
			'is-untitled': ! title,
			'is-mini': this.props.compact,
			'is-placeholder': ! this.props.globalId
		} );

		return (
			<Card compact className={ classes }>
				<div className="post-item__detail">
					<div className="post-item__title-meta">
						<h1 className="post-item__title">
							<a href={ this.props.editUrl } className="post-item__title-link">
								{ title || this.props.translate( 'Untitled' ) }
							</a>
						</h1>
						<div className="post-item__meta">
							<PostRelativeTime globalId={ this.props.globalId } />
							<PostStatus globalId={ this.props.globalId } />
							<PostTypePostAuthor globalId={ this.props.globalId } />
						</div>
					</div>
				</div>
				<PostTypeListPostThumbnail globalId={ this.props.globalId } />
				<PostActionsEllipsisMenu globalId={ this.props.globalId } />
			</Card>
		);
	}

PostItem.propTypes = {
	translate: PropTypes.func,
	globalId: PropTypes.string,
	post: PropTypes.object,
	className: PropTypes.string,
	compact: PropTypes.bool
};

export default connect( ( state, ownProps ) => {
	const post = getNormalizedPost( state, ownProps.globalId );
	if ( ! post ) {
		return {};
	}

	return {
		post,
		editUrl: getEditorPath( state, post.site_ID, post.ID )
	};
} )( localize( PostItem ) );
