import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ImSearch } from 'react-icons/im';
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
              <span className="button-label">
                <ImSearch style={{ marginRight: 8 }} />
                Search
              </span>
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
