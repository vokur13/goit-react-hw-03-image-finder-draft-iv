import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import '../../css/styles.css';

let schema = yup.object().shape({
  login: yup.string(),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await onSubmit(values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <header className="searchbar">
      <Formik
        initialValues={{ query: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <button type="submit" disabled={isSubmitting} className="button">
              <span className="button-label">Search</span>
            </button>

            <Field
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              name="query"
              placeholder="Search images and photos"
            />
            <ErrorMessage component="div" name="query" />
          </Form>
        )}
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

// ==============================================

// export class Searchbar extends Component {
//   state = { query: '' };

//   handleQueryChange = e => {
//     this.setState({ query: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.query.trim() === '') {
//       return toast.error('Please input Your query');
//     }
//     this.props.onSubmit(this.state.query);
//     this.setState({ query: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form onSubmit={this.handleSubmit} className="SearchForm">
//           <button type="submit">
//             <span>
//               <ImSearch style={{ marginRight: 8 }} />
//               Search
//             </span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             name="query"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleQueryChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
