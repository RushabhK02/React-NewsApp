import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import './App.css';
import {withRouter} from 'react-router-dom';
import ShareIcon from './ShareIcon';
import MediaQuery from 'react-responsive';
import Card from 'react-bootstrap/Card';

const tags = ["business", "world", "sport", "technology", "politics", "guardian", "nytimes"];

//Create Articles
class SearchArticle extends Component {
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
        // console.log(this.state.article);
        var imageName = this.state.article.imageUrl != "default" ? this.state.article.imageUrl :
            this.state.type != "NY" ? require('./Guardian.png') : require('./Nytimes.jpg');
        var date = new Date(this.state.article.pubDate);
        let dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);
        let pubDateStr = this.state.article.pubDate.substring(0,10);
        let id = this.state.type!="NY"?this.state.article.artId:this.state.article.artUrl;    
        return (
            <React.Fragment>
            <MediaQuery minDeviceWidth={650}>
            <div className="search-article" onClick={this.handleClick}>
                <div className="cover-space">
                <div className="search-content">
                    <br />
                    <h6><i>{this.state.article.title}</i>&nbsp;
                    <ShareIcon article={this.state.article} />
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
                                </Badge>
                            </span>
                        </div>
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
                        <i>{this.state.article.title}</i> &nbsp;
                        <ShareIcon article={this.state.article} />
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
                                </Badge>
                            </span>
                    </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </MediaQuery>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchArticle);