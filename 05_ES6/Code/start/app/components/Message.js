//Import replaces Require in JS6
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


var Message = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
    )
  }
});

export default Message;
