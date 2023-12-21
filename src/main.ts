import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

//PRIME VUE COMPONENTS
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import Chip from 'primevue/chip';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import InputSwitch from 'primevue/inputswitch';
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from "primevue/dropdown";
import 'primeicons/primeicons.css';
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import Checkbox from "primevue/checkbox";
import Password from "primevue/password";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Skeleton from 'primevue/skeleton';
import Chips from "primevue/chips";
import VirtualScroller from "primevue/virtualscroller";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "primevue/breadcrumb";
import ProgressSpinner from "primevue/progressspinner";
import Badge from "primevue/progressspinner";
import ProgressBar from 'primevue/progressbar';
import Avatar from "primevue/avatar";
import SpeedDial from "primevue/speeddial";
import Carousel from 'primevue/carousel';
import Knob from 'primevue/knob';
import OrderList from 'primevue/orderlist';
import Slider from 'primevue/slider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive("styleclass", StyleClass);
app.directive('tooltip', Tooltip);
app.use(PrimeVue, {inputStyle: 'filled'});
app.use(ToastService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Editor', Editor);
app.component('Card', Card);
app.component('Chip', Chip);
app.component('InputSwitch', InputSwitch);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.component('Carousel', Carousel)
app.component('Slider', Slider)
app.component('Chips', Chips);
app.component('Textarea', Textarea);
app.component('TabPanel', TabPanel);
app.component('Image', Image);
app.component('Calendar', Calendar);
app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload);
app.component('ScrollPanel', ScrollPanel);
app.component('TabView', TabView)
app.component("Dialog", Dialog);
app.component('Checkbox', Checkbox);
app.component('Password', Password);
app.component('Toast', Toast)
app.component('Badge', Badge)
app.component('OrderList', OrderList)
app.component('Breadcrumb', Breadcrumb)
app.component('Avatar', Avatar);
app.component('Dropdown', Dropdown)
app.component('SpeedDial', SpeedDial)
app.component('Knob', Knob)
app.component('VirtualScroller', VirtualScroller);
app.component('ProgressBar', ProgressBar);
app.component('Skeleton', Skeleton);


app.mount('#app')
