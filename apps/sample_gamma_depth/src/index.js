/* WARNING: SHOULD NOT BE CHANGED */
import ReactDOM from 'react-dom';
import { withCorvaMagicHOC } from '@corva/ui/CLI';
import manifest from '../manifest.json';
import packageJson from '../package.json';
import AppSettings from './AppSettings';
import App from './App';
const AppComponent = withCorvaMagicHOC({
  component: App,
  settings: AppSettings,
  manifest,
  packageJson,
});
ReactDOM.render(<AppComponent />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
