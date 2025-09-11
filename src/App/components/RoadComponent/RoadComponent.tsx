import ButtonComponent from '../ButtonComponent/ButtonComponent';
import CarTopIcon from '../../assets/CarTopIcon';
import './RoadComponent.css';

type Props = {
  carColor?: string;
  name: string;
  position?: number;
  timeMs?: number;
  onPressSelect?: () => void;
  onPressRemove?: () => void;
  onPressA?: () => void;
  onPressB?: () => void;
  disabledA?: boolean;
  disabledB?: boolean;
};

const RoadComponent: React.FC<Props> = ({
  carColor = '#000',
  name,
  position = 0,
  timeMs = 0,
  onPressSelect,
  onPressRemove,
  onPressA,
  onPressB,
  disabledA = false,
  disabledB = true,
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
          <ButtonComponent
            label="A"
            color="yellow"
            shape="square"
            onPress={onPressA}
            disabled={disabledA}
          />
        </div>
        <div className="buttongroup">
          <ButtonComponent
            label="Remove"
            color="purple"
            size="small"
            shape="rect"
            onPress={onPressRemove}
          />
          <ButtonComponent
            label="B"
            color="blue"
            shape="square"
            onPress={onPressB}
            disabled={disabledB}
          />
        </div>
      </div>

      <div
        className="car"
        style={{
          transform: `translateX(${position}px)`,
          transition: `transform ${timeMs}ms linear`,
        }}
      >
        <CarTopIcon color={carColor} />
      </div>
      <div className="car-name">{name}</div>
    </div>
  );
};

export default RoadComponent;
