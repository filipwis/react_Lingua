import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { connect } from 'react-redux';
import { addDictionary as addDictionaryAction } from '../../../actions';
import { Formik, Form } from 'formik';

const StyledWrapper = styled.div`
  @keyframes modalAppear {
    0% {
      opacity: 0;
      top: 350px;
    }
    100% {
      opacity: 1;
      top: 400px;
    }
  }
  position: fixed;
  top: 400px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.yellow};
  border-radius: 30px;
  border: none;
  box-shadow: 0 10px 30px -5px hsla(0, 0%, 0%, 0.3);
  z-index: 9999;
  animation: modalAppear 1s ease;
`;

const StyledCloseButton = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.cyan};
  border-radius: 50%;
  border: none;
  position: absolute;
  right: 35px;
  top: 25px;

  &::before,
  &::after {
    content: '';
    width: 18px;
    height: 2px;
    position: absolute;
    background: white;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    transform-origin: 50%;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const StyledHeading = styled(Heading)`
  position: absolute;
  top: 60px;
`;

const StyledForm = styled(Form)`
  margin-top: 150px;
  width: 80%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 350px;
  height: 40px;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  margin-top: 60px;
`;

const Modal = ({ handleModal, addDictionary }) => (
  <StyledWrapper>
    <StyledCloseButton onClick={handleModal} />
    <StyledHeading>Create a new dictionary</StyledHeading>
    <Formik
      initialValues={{
        name: '',
        imageUrl: '',
      }}
      onSubmit={(values) => {
        if (values.imageUrl === '') {
          values.imageUrl =
            'https://images.unsplash.com/photo-1562917616-88a9472dbfe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
        }
        addDictionary(values);
        handleModal();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm autoComplete="off">
          <StyledInput
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            required
          />
          <StyledInput
            type="text"
            name="imageUrl"
            placeholder="Dictionary's image url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.imageUrl}
          />
          <StyledButton type="submit">Create</StyledButton>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

const mapDispatchToProps = (dispatch) => ({
  addDictionary: (dictionaryContent) => dispatch(addDictionaryAction(dictionaryContent)),
});

export default connect(null, mapDispatchToProps)(Modal);
