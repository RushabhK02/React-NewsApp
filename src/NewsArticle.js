import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import './App-sm.css';
import './App.css';
import ShareIcon from './ShareIcon';
import {withRouter} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Card from 'react-bootstrap/Card';

const tags = ["business", "world", "sport", "technology", "politics", "guardian", "nytimes"];

//Create Articles
class NewsArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: this.props.data.article,
            type: this.props.data.type
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let id = this.state.type != "NY" ? this.state.article.artId : this.state.article.artUrl;
        // console.log("parent click");
        e.stopPropagation();
        
        // this.props.handleClick(e);
        this.props.history.push("/article?id=" + id);
    }

    render() {
        var imageName = this.state.article.imageUrl != "default" ? this.state.article.imageUrl :
            this.state.type != "NY" ? require('./Guardian.png') : require('./Nytimes.jpg');
        var description = '';
        if (this.state.article.description)
            description = this.state.article.description;
        let date = new Date(this.state.article.pubDate);
        let pubDateStr = this.state.article.pubDate.substring(0,10);
        let dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);
        // console.log(pubDateStr);
        let id = this.state.type != "NY" ? this.state.article.artId : this.state.article.artUrl;
        return (
            <div onClick={this.handleClick}>
            <MediaQuery minDeviceWidth={650}>
            <div className="news-article">
                    <div className="article-img">
                        <img className="card-img" width="250px" height="200px" src={imageName} />
                    </div>
                <div className="article-description">

                    <h4>
                        <i>{this.state.article.title}</i> &nbsp;
                        <ShareIcon article={this.state.article} />
                    </h4>
                    <div className="article-desc block-with-text">
                        {description}
                    </div>
                    <br />
                    <div className="article-info">
                        <span><i>
                            {/* {dateString} */}
                            {pubDateStr}
                        </i></span>
                        <span className="section-tag">
                            <Badge className={tags.includes(this.state.article.section.toLowerCase()) ? this.state.article.section.toLowerCase() : "other"}>
                                {this.state.article.section.toUpperCase() == "SPORT" ? "SPORTS" : this.state.article.section.toUpperCase()}
                            </Badge>
                        </span>
                    </div>
                </div>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={649} >
                <Card style={{ width: '95%', margin: 'auto', marginTop:'3%', marginBottom:'3%',
                               boxShadow: '0 3px 3px 3px rgba(0,0,0,0.3)',
                               borderRadius: '3px' }}>
                    <Card.Img style={{ width: '90%', marginTop: '5%' , alignSelf: 'center'}} src={imageName} />
                    <Card.Body style={{ marginTop: '0%' }} >
                    <Card.Title><i>{this.state.article.title}</i> &nbsp;
                        <ShareIcon article={this.state.article} />
                    </Card.Title>
                    <Card.Text>
                    <div className="article-desc block-with-text">
                        {description}
                    </div>
                    <br />
                    <div className="article-info">
                        <span style={{fontSize: '110%'}}><i>
                            {/* {dateString} */}
                            {pubDateStr}
                        </i></span>
                        <span className="section-tag">
                            <Badge className={tags.includes(this.state.article.section.toLowerCase()) ? this.state.article.section.toLowerCase() : "other"}>
                                {this.state.article.section.toUpperCase() == "SPORT" ? "SPORTS" : this.state.article.section.toUpperCase()}
                            </Badge>
                        </span>
                    </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
                {/* This works!  */}
            </MediaQuery>
            </div>
        )
    }
}

export default withRouter(NewsArticle);