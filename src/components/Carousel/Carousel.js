import React, { Component } from 'react';
import Axios from 'axios';
import Data from '../Data/Data';
import Spinner from '../Spinner/Spinner';
import './Carousel.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '@material-ui/lab/Rating';
import { styled } from '@material-ui/core/styles';


const CarouselRating = styled(Rating)({
    color: '#008489',
  });

class ViewAllItems extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            items: this.props.items
        }
    }

    componentDidUpdate(prevProps, prevState) {
       if(prevState.show !== this.state.show){
         this.setState({ show: true }, () => {
             console.log('ComponentDidUpdate has been triggered!');
         });
       }
     }

     static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.items !== prevState.items){
          return { show: nextProps.show};
       } else return null;
     }

    
   render() {
    let { show } = this.state;
    return (
        <div>
            <div className='show-all-items'>
                <h3 className='title'>View all items</h3>
                { show ? 
                    this.props.items.map((item, index) => {
                        return <div className='carousel-item-container show-all-items' key={index}>
                                    <div className='carousel-item-container-inner-top'>
                                        <img className='carousel-image' src={item.image} alt={item.title} />
                                    </div>
                                    <div className='carousel-item-container-inner-bottom'>
                                    <h5 className='carousel-category'>{ item.category }</h5>
                                    <h4 className='carousel-title'>{ item.title }</h4>
                                    <p className='carousel-price'>{ `$${item.price}` } per person</p>
                                    <p className='carousel-rating'><CarouselRating name="read-only" value={ item.reviews.rating } precision={0.5} readOnly size="small" /><span className='carousel-review-count'>{ item.reviews.count }</span></p>
                                    </div>
                                </div>;
                        }) 
                    :
                    null 
                }
            </div>
        </div>
    )
  }
}

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null,
            show: false,
            carouselSettings : {
                dots: false,
                arrows: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        }
        this.fetchData = this.fetchData.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    async fetchData(endpoint) {
        try {
            const RESULT = await Axios.get(endpoint);
            console.log('The data has been fetched successfully', RESULT);
            this.setState({ data: RESULT.data });
        } catch(e) {
            console.error('There has been an error with your fetch request', e);
        }
    }

    showAll() {
        this.setState({ show: true });
    }

    render() {
        let { carouselSettings, data, show } = this.state;
        return (
            <div>
                <Data fetchData = {this.fetchData} />
                <div className='carousel-container'>
                    <h2 className='title'>Experiences in Paris</h2>
                    <button className='show-all-items-btn' onClick={this.showAll}>See all <span className='right-icon'></span></button>
                    { data ?
                        <Slider {...carouselSettings}>
                            { data.map((item, index) => {
                            return <div className='carousel-item-container' key={index}>
                                        <div className='carousel-item-container-inner-top'>
                                            <img className='carousel-image' src={item.image} alt={item.title} />
                                        </div>
                                        <div className='carousel-item-container-inner-bottom'>
                                        <h5 className='carousel-category'>{ item.category }</h5>
                                        <h4 className='carousel-title'>{ item.title }</h4>
                                        <p className='carousel-price'>{ `$${item.price}` } per person</p>
                                        <p className='carousel-rating'><CarouselRating name="read-only" value={ item.reviews.rating } precision={0.5} readOnly size="small" /><span className='carousel-review-count'>{ item.reviews.count }</span></p>
                                        </div>
                                    </div>;
                            }) }
                        </Slider>
                        :
                        <Spinner />
                    }
                </div>
                <ViewAllItems items={data} show={show} />
            </div>
        );
    };
}
