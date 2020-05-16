import React, { Component } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
import './App.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class ShareButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: this.props.trigger
    }
  }


  render() {
    // let styling = {
    //   marginRight: this.props.size? this.props.size: 2,
    //   marginLeft: this.props.size? this.props.size: 2
    // }
    let setFloat = this.props.styling!="articleIcon-margin"?true:false;
    return (
      <span className="shareButtons">
        {this.state.trigger ? (<React.Fragment>
          <OverlayTrigger
            key="bottom1"
            placement="top"
            overlay={
              <Tooltip id="FBTooltip">
                Facebook
              </Tooltip>
            }
          >
            <FacebookShareButton
              url={this.props.article.article.artUrl}
              hashtag="#CSCI_571_NewsApp"
              style={ setFloat? {float: "left", paddingLeft:"5%"}: {}}
            >
              <FacebookIcon size={50} round />
            </FacebookShareButton>
          </OverlayTrigger>

          <OverlayTrigger
            key="bottom2"
            placement="top"
            overlay={
              <Tooltip id="TwitterTooltip">
                Twitter
              </Tooltip>
            }
          >
            <TwitterShareButton
              url={this.props.article.article.artUrl}
              hashtag="#CSCI_571_NewsApp"
              // style={styling}
              className={setFloat?'':this.props.styling}
            >
              <TwitterIcon size={50} round />
            </TwitterShareButton>
          </OverlayTrigger>

          <OverlayTrigger
            key="bottom"
            placement="top"
            overlay={
              <Tooltip id="EmailTooltip">
                Email
              </Tooltip>
            }
          >
            <EmailShareButton
              url={this.props.article.article.artUrl}
              subject="#CSCI_571_NewsApp"
              style={ setFloat? {float: "right", paddingRight:"5%"}: {}}
            >
              <EmailIcon size={50} round />
            </EmailShareButton>
          </OverlayTrigger>
        </React.Fragment>
        )
          : (<React.Fragment>
            <FacebookShareButton
              url={this.props.article.article.artUrl}
              hashtag="#CSCI_571_NewsApp"
            >
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={this.props.article.article.artUrl}
              hashtag="#CSCI_571_NewsApp"
              // style={styling}
              className={this.props.styling}
            >
              <TwitterIcon size={50} round />
            </TwitterShareButton>
            <EmailShareButton
              url={this.props.article.article.artUrl}
              subject="#CSCI_571_NewsApp"
            >
              <EmailIcon size={50} round />
            </EmailShareButton></React.Fragment>)}
      </span>
    );
  }
}
export default ShareButtons;