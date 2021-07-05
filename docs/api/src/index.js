import App from './ApiPatchRequest';

export default {
  component: props => {
    if (props.well) return <App {...props} />;
    return 'Loading';
  },
  settings: () => null,
};
