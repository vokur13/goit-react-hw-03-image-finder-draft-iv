import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${props => `${props.theme.colors.white}`};
  border-radius: ${props => `${props.theme.radii.searchForm}px`};
  overflow: hidden;
  /* display: block;
  width: 100%;
  padding: ${props => `${props.theme.space[1]}px`}; */
`;

export const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: ${props => `${props.theme.sizes[5]}px`};
  border: ${props => `${props.theme.borders.none}`};
  outline: none;
  padding-left: ${props => `${props.theme.space[1]}px`};
  padding-right: ${props => `${props.theme.space[1]}px`};
  &::placeholder {
    font: inherit;
    font-size: ${props => `${props.theme.fontSizes.s}px`};
  /* width: 75%;
  padding: ${props => `${props.theme.space[1]}px`};
  &:not(:last-child) {
    margin-bottom: ${props => `${props.theme.space[2]}px`};
  } */
`;

export const Error = styled(ErrorMessage)`
  color: ${props => props.theme.colors.red};
  margin-bottom: ${props => `${props.theme.space[2]}px`};
`;
