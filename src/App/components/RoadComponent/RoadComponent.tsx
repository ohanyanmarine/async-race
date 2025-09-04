import ButtonComponent from '../ButtonComponent/ButtonComponent';
import CarTopIcon from '../../assets/CarTopIcon';
import './RoadComponent.css';

type Props = {
  carColor?: string;
  name: string;
  onPressSelect?: () => void;
  onPressRemove?: () => void;
};

const RoadComponent: React.FC<Props> = ({
  carColor = '#000',
  name,
  onPressSelect,
  onPressRemove,
}) => {
  return (
    <div className="lane">
      <div className="controls">
        <div className="buttongroup">
          <ButtonComponent
            label="Select"
            color="green"
            size="small"
            shape="rect"
            onPress={onPressSelect}
          />
          <ButtonComponent label="A" color="yellow" shape="square" />
        </div>
        <div className="buttongroup">
          <ButtonComponent
            label="Remove"
            color="purple"
            size="small"
            shape="rect"
            onPress={onPressRemove}
          />
          <ButtonComponent label="B" color="blue" shape="square" disabled />
        </div>
      </div>

      <div className="car">
        <CarTopIcon color={carColor} />
      </div>
      <div className="car-name">{name}</div>
    </div>
  );
};

export default RoadComponent;
