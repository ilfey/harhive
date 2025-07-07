import {createRoot} from 'react-dom/client';
import {appStarted} from 'shared/config/init';
import '../styles/index.scss';
import 'generated/styles.css';
import {App} from '../ui/App';


const root = createRoot(document.querySelector('#root')!);

appStarted();

root.render(App());