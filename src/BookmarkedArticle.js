import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import './App.css';
import {withRouter} from 'react-router-dom';
import ShareIcon from './ShareIcon';
import DeleteIcon from './DeleteIcon';
import MediaQuery from 'react-responsive';
import Card from 'react-bootstrap/Card';

import ShareButtons from './ShareButtons';
import Modal from 'react-bootstrap/Modal';

const tags = ["business", "world", "sport", "technology", "politics", "guardian", "nytimes"];

//Create Articles
class BookmarkedArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: this.props.data.article,
            type: this.props.data.article.type,
            id: this.props.data.id,
            shareModal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickModal = this.handleClickModal.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        
        // this.props.handleClick(e);
        this.props.history.push("/article?id=" + this.state.id);
    }

    handleClose(e) {
        this.setState({
          shareModal: false
        })
      }
    
    handleClickModal(e) {
        e.stopPropagation();
        return;
    }

    deleteFavoriteArticle = (id) => {
        // Event.stopPropagation();
        this.props.callback(id)
    }

    displayModal(item){
        this.setState({
            shareModal:true
        })
    }

    render() {
        // console.log(this.state.article);
        var imageName = this.state.article.imageUrl != "default" ? this.state.article.imageUrl :
            this.state.type != "NY" ? require('./Guardian.png') : require('./Nytimes.jpg');
        var date = new Date(this.state.article.pubDate);
        let dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);   
        let pubDateStr = this.state.article.pubDate.substring(0,10);
        let newsChannel = this.state.type=="NY"?"nytimes":"guardian";
        let article = this.state;
        return (
            <React.Fragment>
                <MediaQuery minDeviceWidth={650}>
                    <div className="search-article" onClick={this.handleClick}>
                        <div className="cover-space">
                            <div className="search-content">
                                <br />
                                <h6><i>{this.state.article.title}</i>&nbsp;
                                <span style={{display:"inline"}}><ShareIcon flag={true} 
                                newsChannel={this.state.type} article={this.state.article}
                                callback={this.displayModal} /> 
                                <DeleteIcon id={this.state.id} 
                                title={this.state.article.title} callback={this.deleteFavoriteArticle}/></span>
                                </h6>
                            
                                <img className="search-img" src={imageName} />
                                <div className="search-description">
                                    {/* <br /> */}
                                    <div className="search-info">
                                        <span className="date-size"><i>
                                        {/* {dateString} */}
                                        {pubDateStr}
                                        </i></span>
                                        <span className="section-tag">
                                            <Badge className={tags.includes(this.state.article.section.toLowerCase()) ? this.state.article.section.toLowerCase() : "other"}>
                                                {this.state.article.section.toUpperCase()=="SPORT"?"SPORTS":this.state.article.section.toUpperCase()}
                                            </Badge> &nbsp;
                                            <Badge className={newsChannel} > 
                                                {newsChannel.toUpperCase()}
                                            </Badge>
                                        </span>
                                    </div>
                                    {/* <br /> */}
                                </div>
                            </div>
                        </div>
                    </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={649}>
            <div onClick={this.handleClick}>
                <Card style={{ width: '95%', margin: 'auto', marginTop:'3%', marginBottom:'3%',
                               boxShadow: '0 3px 3px 3px rgba(0,0,0,0.3)',
                               borderRadius: '3px' }}>
                    <Card.Title style={{width: '90%', alignSelf: 'center', marginTop:'5%', marginBottom:'3%' }}>
                            <i>{this.state.article.title}</i>&nbsp;
                            <ShareIcon flag={true} newsChannel={this.state.type} article={this.state.article}
                            callback={this.displayModal} /> 
                            <DeleteIcon id={this.state.id} title={this.state.article.title} 
                                        callback={this.deleteFavoriteArticle}/>
                    </Card.Title>
                    <Card.Img style={{ width: '90%', alignSelf: 'center'}} src={imageName} />
                    <Card.Body style={{ marginTop: '0%' }} >
                    
                    <Card.Text>
                        <div className="search-info">
                            <span style={{fontSize: '110%'}}><i>
                            {/* {dateString} */}
                            {pubDateStr}
                            </i></span>
                            <span className="section-tag">
                                <Badge className={tags.includes(this.state.article.section.toLowerCase()) ? this.state.article.section.toLowerCase() : "other"}>
                                                    {this.state.article.section.toUpperCase()=="SPORT"?"SPORTS":this.state.article.section.toUpperCase()}
                                </Badge> &nbsp;
                                <Badge className={newsChannel} > 
                                    {newsChannel.toUpperCase()}
                                </Badge>
                            </span>
                        </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </MediaQuery>

            {/* Modal */}
        <MediaQuery minDeviceWidth={650}>
        {
          this.state.shareModal?
        (<div onClick={(e) => e.stopPropagation()}>
        <Modal dialogClassName="modal-box" show={this.state.shareModal} onClick={this.handleClickModal}
          onHide={this.handleClose} backdrop="static" keyboard={ false }>
          <Modal.Header className="modal-heading" closeButton>
          <div className="modal-title">
            <h5>{this.state.type != "NY" ? "GUARDIAN" : "NY TIMES"}</h5>
            <div> {article.article.title}</div>
          </div>
          </Modal.Header>
            <Modal.Body>
              <div>
                <h6 className="toast-share">Share via</h6>
                <ShareButtons article={article} styling="shareIcon-margins" />
              </div>
            </Modal.Body>
        </Modal>
        </div>):null
        }
        </MediaQuery>
        <MediaQuery maxDeviceWidth={649} >
        <div onClick={(e) => e.stopPropagation()}>
        <Modal size='sm' dialogClassName="modal-box" show={this.state.shareModal} onClick={this.handleClickModal}
          onHide={this.handleClose} backdrop="static" keyboard={ false }>
          <Modal.Header className="modal-heading" closeButton>
          <div className="modal-title">
            <h5>{this.state.type != "NY" ? "GUARDIAN" : "NY TIMES"}</h5>
            <div> {article.article.title}</div>
          </div>
          </Modal.Header>
            <Modal.Body>
              <div>
                <h6 className="toast-share">Share via</h6>
                <ShareButtons article={article} styling="shareIcon-margins-sm" />
              </div>
            </Modal.Body>
        </Modal>
        </div>
        </MediaQuery>

        </React.Fragment>
        )
    }
}

export default withRouter(BookmarkedArticle);