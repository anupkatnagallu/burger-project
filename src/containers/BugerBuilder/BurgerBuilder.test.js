import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder loadIngredients={() => {}}/>);
    });

    it('Loading BuildControls if ingredients is not null', () => {
        wrapper.setProps({
            ingredients: {salad: 0}
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});