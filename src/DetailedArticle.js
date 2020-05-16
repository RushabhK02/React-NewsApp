import React, { Component } from 'react';
import queryString from 'query-string';
import Loader from './Loader';
import './App-sm.css';
import './App.css';
import ShareButtons from './ShareButtons';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast, cssTransition as ToastTransition } from 'react-toastify';
import { OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import ArticleCommentBox from './ArticleCommentBox';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MediaQuery from 'react-responsive';
import Card from 'react-bootstrap/Card';

const Zoom = ToastTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    duration: 1000,
});

class DetailedArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: queryString.parse(this.props.location.search),
            article: {},
            bookmark: false,
            flag: this.props.flag,
            showToast: false,
            removeToast: false,
            hideDesc: true,
            newsChannel: this.props.newsChannel
        }

        this.saveArticleToast = this.saveArticleToast.bind(this);
        this.removeArticleToast = this.removeArticleToast.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
        this.descriptionRef = React.createRef();
        this.imageRef = React.createRef();
        this.commentRef = React.createRef();
        this.scroll = this.scroll.bind(this);
    }

    requestArticle() {
        if (this.state.flag) return;

        // console.log(this.state.newsChannel);
        // fetch("http://localhost:5000/article?id=" + this.state.params.id, {
        fetch("https://wt-hw8-node-backend.appspot.com/article?id=" + this.state.params.id, {
            method: 'GET',
            headers: {
                'news-provider': this.state.newsChannel
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((resData) => {
                let data = resData.formattedArticle;
                // console.log(data);
                let id = data.type != "NY" ? data.artId : data.artUrl;
                this.setState({
                    article: data, flag: true,
                    bookmark: this.props.articles[id] != null ? true : false
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.flag != this.props.flag) {
            this.setState({ flag: false });
        }
    }

    toggleBookmark = () => {
        let id = this.state.article.type != "NY" ? this.state.article.artId : this.state.article.artUrl;

        if (this.state.showToast || this.state.removeToast) return;
        let bookmark = !this.state.bookmark;
        if (bookmark) {
            this.saveArticleToast();
        } else {
            this.removeArticleToast();
        }
        this.props.callback({ bookmark, article: this.state.article, id });
        this.setState({
            bookmark
        });
    }

    saveArticleToast() {
        // console.log("I was called")
        if (this.state.shareToast) return;
        if (this.state.removeToast) return;
        this.setState({
            showToast: true
        })


        toast((<div>
            <h6 className="toast-heading">{"Saving " + this.state.article.title}</h6>
        </div>), {
                position: "top-center",
                autoClose: true,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false,
                transition: Zoom,
                autoClose: 2000,
                className: 'shareToast',
                onClose: () => this.setState({ showToast: false })
            });
    }

    toggleDescription(event) {
        this.setState((prevState) => ({
            hideDesc: !prevState.hideDesc
        }))
        
        if(this.state.hideDesc) this.scroll();
        else this.scrollBack();
    }

    removeArticleToast() {
        // console.log("I was called")
        if (this.state.removeToast) return;
        if (this.state.showToast) return;
        this.setState({
            removeToast: true
        })

        toast((<div>
            <h6 className="toast-heading">{"Removing - " + this.state.article.title}</h6>
        </div>), {
                position: "top-center",
                autoClose: true,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false,
                transition: Zoom,
                autoClose: 2000,
                className: 'shareToast',
                onClose: () => this.setState({ removeToast: false })
            });
    }

    scroll() {
        this.descriptionRef.current.scrollIntoView({behavior: 'smooth', block: "start"});
    }

    scrollBack() {
        // this.descriptionRef.current.
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        // this.descriptionRef.current.scrollIntoView(false);
    }

    render() {
        this.requestArticle();
        var imageName = this.state.article.imageUrl != "default" ? this.state.article.imageUrl :
            this.state.newsChannel != "NY" ? require('./Guardian.png') : require('./Nytimes.jpg');
        var description = '';
        let shortDesc = '';
        let extendedDesc = '';
        let extension = '';
        var scroller = true;
        if (this.state.article.description) {
            description = this.state.article.description;
            let index = -1, count = 0;
            if (description.length > 401) {
                while (index < description.length - 1) {
                    index = description.indexOf(". ", index + 1);
                    count++;
                    if (count == 4) break;
                }
            } else index = description.length - 1;
            shortDesc = description.substring(0, index + 1);
            if (shortDesc.length == description.length) {
                scroller = false;
            } else {
                extendedDesc = description.substring(index + 1);
            }
            extension = (index < description.length - 1 && index != -1) ? '..' : '';
        }
        
        let date = new Date(this.state.article.pubDate);

        // let dateString = date.getDate().toString().padStart(2, 0) + " " + date.toLocaleString('default', { month: 'long' })
        //     + " " + date.getFullYear().toString();
        let dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);
      
        let id = this.state.article.type != "NY" ? this.state.article.artId : this.state.article.artUrl;

        let displayText = (this.state.hideDesc ? <div className="detailed-desc">
            {shortDesc + extension}
        </div> : <div className="detailed-desc">
                <div>{shortDesc}</div>
                {/* <br /> */}
                <div>{extendedDesc}</div>
            </div>
        )

        if (!this.state.flag) {
            return (<div> <Loader /> </div>);
        } else {
            let articleJson = { article: this.state.article };
            let pubDateStr = this.state.article.pubDate.substring(0,10);
            // console.log(pubDateStr);
            return (
                    <div>
                    <MediaQuery minDeviceWidth={650}>
                    <div className="detailed-article">
                        <h2 className="detailed-heading"><i>{this.state.article.title}</i></h2>
                        <div className="article-caption">
                            <div className='column'>
                                {/* {dateString} */}
                                {pubDateStr}
                            </div>
                            <div className='column share-column'>
                                <ShareButtons trigger={true} article={articleJson} styling="articleIcon-margin" />
                            </div>
                            <div className='column bookmark-column'>
                                <OverlayTrigger
                                    key="bottom"
                                    placement="top"
                                    overlay={
                                        <Tooltip id="bookmarkTooltip">
                                            Bookmark
                                </Tooltip>
                                    }
                                >
                                    <span className="bookmarkToggle" onClick={this.toggleBookmark}>
                                        {this.state.bookmark ? <FaBookmark color="red" size={25} /> : <FaRegBookmark color="red" size={25} />}
                                    </span>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <img src={imageName} className="detailed-img" ref={this.imageRef}/>
                        <div ref={this.descriptionRef}>
                            {displayText}
                        </div>

                        {scroller ?
                            <span className="article-scroller">
                                {this.state.hideDesc ? <FaChevronDown onClick={this.toggleDescription} /> :
                                    <FaChevronUp onClick={this.toggleDescription} />}
                            </span>
                            : null
                        }
                        <br />
                        <ArticleCommentBox identifier={id} ref={this.commentRef} />
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={649} >
                    <Card style={{ width: '95%', margin: 'auto', marginTop:'3%', marginBottom:'4%',
                               boxShadow: '0 3px 3px 3px rgba(0,0,0,0.3)',
                               borderRadius: '3px' }}>
                        <Card.Title style={{width: '90%', alignSelf: 'center', marginTop:'5%', marginBottom:'3%' }}>
                        <h2><i>{this.state.article.title}</i></h2>
                        </Card.Title>
                        <Card.Text style={{marginBottom:'0px'}}>
                            
                        <div className="row-sm">
                        <div className="column-sm lg-text">
                            {/* {dateString} */}
                            {pubDateStr}
                        </div>
                        <div className="column-sm share-column-sm">
                            <ShareButtons trigger={true} article={articleJson} styling="articleIcon-margin" />
                        </div>
                        <div className="column-sm bookmark-column-sm">
                            <OverlayTrigger
                                key="bottom"
                                placement="top"
                                overlay={
                                    <Tooltip id="bookmarkTooltip">
                                        Bookmark
                            </Tooltip>
                                }
                            >
                                <span className="bookmarkToggle" onClick={this.toggleBookmark}>
                                    {this.state.bookmark ? <FaBookmark color="red" size={25} /> : <FaRegBookmark color="red" size={25} />}
                                </span>
                            </OverlayTrigger>
                        </div>
                        </div>
                        </Card.Text>
                        <Card.Img style={{ border: 'none', width: '90%', marginBottom: '0%', marginTop: '3%' , alignSelf: 'center'}} src={imageName} />
                        <Card.Body style={{ marginTop: '0%' }} >
                        <div ref={this.descriptionRef}>
                            {displayText}
                        </div>

                        {scroller ?
                            <span className="article-scroller">
                                {this.state.hideDesc ? <FaChevronDown onClick={this.toggleDescription} /> :
                                    <FaChevronUp onClick={this.toggleDescription} />}
                            </span>
                            : null
                        }
                        <br />
                        <ArticleCommentBox identifier={id} ref={this.commentRef} />
                        </Card.Body>
                    </Card>
                </MediaQuery>
                </div>
            )
        }
    }
}
export default DetailedArticle;