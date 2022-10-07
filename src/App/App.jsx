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
    //     loader: false,
    error: false,
    page: null,
    query: '',
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
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
      } finally {
        // this.setState({ loader: false });
        // this.setState(state => ({ page: state.page + 1 }));
      }
    } else if (prevState.page !== page) {
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
  }

  handleFormSubmit = async ({ query }) => {
    this.setState({ query });
  };

  //   handleMoreImage = async () => {
  //     this.setState(state => ({ page: state.page + 1 }));
  //   };
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
          <Box display="flex" justifyContent="center">
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
          <p>Ooops, something goes wrong, please try again</p>
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

    //     return (
    //       <>
    //         {/* {loader && <Loader />} */}
    //         {/* <ToastContainer autoClose={3000} /> */}
    //         {/* <Searchbar onSubmit={this.handleFormSubmit} /> */}
    //         {/* <ImageGallery data={gallery} /> */}
    //         {/* {!query && <p>Please let us know your query item</p>} */}
    //         {/* {error && <p>Ooops, something goes wrong, please try again</p>} */}
    //         {/* {gallery.length > 0 ? <ImageGallery data={gallery} /> : null} */}
    //         {/* {gallery.length > 0 && (
    //           <button
    //             type="button"
    //             onClick={() => {
    //               console.log('addGallery');
    //               this.addGallery();
    //             }}
    //           >
    //             Load more
    //           </button>
    //         )} */}
    //       </>
    //     );
  }
}
