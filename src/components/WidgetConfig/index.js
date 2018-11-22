import React from "react";

export default class WidgetConfig extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    const { onSave, ...config } = props;
    this.state = config;
  }
  render() {
    return (
      <div>
        {Object.entries(this.state).map(item => (
          <div className="cell-config-field" key={item[0]}>
            <input
              type="text"
              placeholder={item[0]}
              value={item[1]}
              onChange={e => this.setState({ [item[0]]: e.target.value })}
            />
          </div>
        ))}

        <div className="cell-config-field">
          <button onClick={() => this.props.onSave({ ...this.state })}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
