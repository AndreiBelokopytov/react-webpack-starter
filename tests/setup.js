import chai from 'chai';
import Enzyme from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());
