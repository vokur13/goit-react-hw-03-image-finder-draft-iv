import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
// import { Box } from 'components/Box';
// import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { fetchGallery } from '../services/ImageGalleryAPI';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';

// import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    gallery: [],
    loader: false,
    error: false,
    page: 1,
  };

  async componentDidMount() {
    console.log('componentDidMount');
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log(prevState);
    console.log(this.state);
    if (this.state.page !== prevState.page) {
      console.log('prevState.page', prevState.page);
      console.log('this.state.page', this.state.page);
    }
  }

  getGallery = async ({ query }) => {
    const { page } = this.state;
    try {
      this.setState({ loader: true });
      this.setState({ page: 1 });
      const wall = await fetchGallery(query, page);
      this.setState(state => ({
        gallery: [...state.gallery, ...wall],
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    } finally {
      this.setState({ loader: false });
      this.setState(state => ({ page: state.page + 1 }));
    }
  };

  addMoreGallery = () => {};

  render() {
    const { loader, gallery, error } = this.state;
    return (
      <>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <Searchbar onSubmit={this.getGallery} />
            <ImageGallery data={gallery} />
          </div>
        )}

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

// =====================================================

// export class App extends Component {
//   state = { searchQuery: '' };

//   handleSearchbarSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSearchbarSubmit} />
//         <ImageGalleryAPI searchQuery={this.state.searchQuery} />
//         <ToastContainer position="top-center" autoClose={3000} />
//       </>
//     );
//   }
// }
