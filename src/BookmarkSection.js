import React, { Component } from 'react';
import Loader from './Loader';
import './App.css';
import BookmarkedArticle from './BookmarkedArticle';
import ls from 'local-storage';
import MediaQuery from 'react-responsive';

class BookmarkSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionData: this.props.articles
        }
        this.deleteFavoriteArticle = this.deleteFavoriteArticle.bind(this);
    }

    deleteFavoriteArticle(id) {
        let sectionData = this.state.sectionData;
        if(this.state.sectionData[id]) {
            // console.log(sectionData);
            delete sectionData[id];
            // this.props.callback({id});
            ls.set('bookmarks', sectionData);
            this.setState({
                sectionData
            });
            // console.log(this.state.sectionData);
        }
    }

    render() {
        // console.log(this.state.sectionData);
        let sectionData = this.state.sectionData;
        // console.log(Object.keys(sectionData).length);
        // console.log(Object.keys(sectionData));
        if(Object.keys(sectionData).length < 1) {
            return (<div>
                <br />
                <h4 className="center">You have no saved articles</h4>
            </div>)
        }
        else return (
            
                <div className="search-articles">
                <MediaQuery minDeviceWidth={650}>
                    <h2 className="search-heading">Favorites</h2>
                    <div className="search-section">
                        {
                            Object.keys(sectionData).map((key) => {
                                return <BookmarkedArticle 
                                key={key} data={sectionData[key]} callback={this.deleteFavoriteArticle}/>
                            })
                        }
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={649}>
                    <h2 className="search-heading-sm">Favorites</h2>
                    <div className="search-section-sm">
                    {
                        Object.keys(sectionData).map((key) => {
                            return <BookmarkedArticle 
                            key={key} data={sectionData[key]} callback={this.deleteFavoriteArticle}/>
                        })
                    }
                    </div>
                </MediaQuery>
                </div>
        )
    }
}

export default BookmarkSection;