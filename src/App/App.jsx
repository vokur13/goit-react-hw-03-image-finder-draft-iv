import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
// import { Box } from 'components/Box';
// import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { fetchGallery } from '../services/ImageGalleryAPI';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    gallery: [],
    loader: false,
    error: false,
    page: null,
    query: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ loader: true });
      this.setState({ page: 1 });
      try {
        const wall = await fetchGallery(query, page);
        this.setState(state => ({ gallery: [...state.gallery, ...wall] }));
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ loader: false });
        this.setState(state => ({ page: state.page + 1 }));
      }
    }
  }

  handleFormSubmit = async ({ query }) => {
    this.setState({ query });
  };

  addMoreGallery = () => {};

  render() {
    const { gallery, loader, error } = this.state;
    return (
      <>
        {loader && <Loader />}
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery data={gallery} />
        {error && (
          <p>Sorry, something goes wrong, reload page and try again please</p>
        )}
        {gallery.length > 0 ? <ImageGallery data={gallery} /> : null}
        {gallery.length > 0 && (
          <button
            type="button"
            onClick={() => {
              console.log('addGallery');
              this.addGallery();
            }}
          >
            Load more
          </button>
        )}
      </>
    );
  }
}
