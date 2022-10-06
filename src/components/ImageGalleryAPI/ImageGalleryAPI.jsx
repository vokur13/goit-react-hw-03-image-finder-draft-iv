import { Component } from 'react';
import { toast } from 'react-toastify';
// import { FetchGallery } from '../../services/ImageGalleryAPI';
// import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';

export class ImageGalleryAPI extends Component {
  state = { data: null, error: null, status: 'idle' };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      FetchGallery(this.props.searchQuery)
        .then(data => {
          if (data.hits.length === 0) {
            return toast.error(`No item ${this.props.searchQuery} found`);
          }
          console.log('data', data);
          const { hits } = data;
          console.log(hits);
          this.setState({ data, status: 'resolved' });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  render() {
    const { data, error, status } = this.state;

    if (status === 'idle') {
      return <div>Let us know query item</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error}</div>;
    }
    if (status === 'resolved') {
      return <ImageGallery data={data.hits} />;
    }
  }
}
