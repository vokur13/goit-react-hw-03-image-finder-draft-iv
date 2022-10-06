import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import { Formik } from 'formik';
// import { SearchForm, Input, Error } from './SearchbarFormik.styled';
import * as yup from 'yup';
import 'css/styles.css';

// =====================================================

// const initialValues = {
//   query: '',
// };

let schema = yup.object().shape({
  login: yup.string(),
});

// export const SearchBar = ({ onSubmit }) => {
//   const handleSubmit = (values, { resetForm }) => {
//     console.log(values);
//     onSubmit(values);
//     resetForm();
//   };

//   return (
//     <Box
//       top={0}
//       left={0}
//       position="sticky"
//       zIndex="appBar"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight={7}
//       px={5}
//       py={3}
//       color="white"
//       bg="accent"
//       boxShadow="appBar"
//       as="header"
//     >
//       <Formik
//         initialValues={initialValues}
//         validationSchema={schema}
//         onSubmit={handleSubmit}
//       >
//         <SearchForm>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>

//           <Input
//             type="text"
//             name="query"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//           <Error component="div" name="query" />
//         </SearchForm>
//       </Formik>
//     </Box>
//   );
// };

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func,
// };
