import {createRoot} from 'react-dom/client';
import {appStarted} from 'shared/config/init';
import '../lib/styles/index.scss';
import 'generated/styles.css';
import {App} from '../ui/App';
import "../model"


const root = createRoot(document.querySelector('#root')!);

appStarted();

root.render(App());