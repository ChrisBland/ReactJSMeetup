var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;

var Header = React.createClass({
  render: function() {
    return (
      <PageHeader>{this.props.headerText}<small>{this.props.subtext}</small></PageHeader>
    )
  }
});

module.exports = Header;