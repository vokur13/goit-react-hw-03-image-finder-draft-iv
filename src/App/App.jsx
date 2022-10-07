import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { fetchGallery } from '../services/ImageGalleryAPI';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryError } from 'components/ImageGalleryError';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    gallery: [],
    error: false,
    page: null,
    query: '',
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, gallery } = this.state;
    if (prevState.query !== query) {
      this.setState({
        status: Status.PENDING,
        loader: true,
        page: 1,
        gallery: [],
      });
      try {
        const wall = await fetchGallery(query, page);
        this.setState(() => ({
          status: Status.RESOLVED,
          gallery: [...wall],
        }));
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
      }
    }
    //     if (gallery === prevState.gallery) {
    //       return toast.error(`No images upon query ${query} found`);
    //     }
    if (prevState.page !== page) {
      this.setState({
        status: Status.PENDING,
        loader: true,
      });

      try {
        const wall = await fetchGallery(query, page);
        this.setState(prevState => ({
          status: Status.RESOLVED,
          gallery: [...prevState.gallery, ...wall],
        }));
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
      }
    }
    if (prevState.gallery === gallery) {
      //       this.setState({ status: Status.PENDING });
    }
  }

  handleFormSubmit = async ({ query }) => {
    this.setState({ query });
  };

  handleMoreImage = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, status, error } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <p>Please let us know your query item</p>
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Box
            p={0}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Loader />
          </Box>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <ToastContainer autoClose={3000} />
          <ImageGalleryError message={error.message} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery data={gallery} />
          <Box display="flex" justifyContent="center">
            <Button type="button" onClick={this.handleMoreImage}>
              Load more
            </Button>
          </Box>
        </>
      );
    }
  }
}
