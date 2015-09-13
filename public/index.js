var app = document.getElementById('app');
var messageContainer = document.getElementById('messageContainer');


var MessageList = React.createClass({
  render: function() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText} className="msgContainer"><div className="msg">{itemText}</div></li>;
    };

    return <ul className="messages">{this.props.items.map(createItem)}</ul>;
  }
});

var ChatTitle = React.createClass({
  render: function() {
      this.props.titleAction = 'edit';
      return <div id="titleContainer"><h3 id="title">{this.props.title}</h3><a href="#" onClick={this.editTitle}>{this.props.titleAction}</a></div>;
  },
  editTitle: function(){
    this.props.titleAction = 'save';
    var title = document.getElementById('title');
    var titleContainer = document.getElementById('titleContainer');

    var titleInput = document.createElement('input');
    titleInput.setAttribute('value', this.props.title);

    title.style.display = "none";
    titleContainer.appendChild(titleInput);
  }

});


window.ChatApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', title: 'tl;dr butts and stuff'};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <div className="well">
          <ChatTitle title={this.state.title}/>
        </div>
        <div className="well">
          <MessageList items={this.state.items} />
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <textarea className="form-control" rows="3" onChange={this.onChange} value={this.state.text}></textarea>
          <button className="btn btn-primary pull-right">Send</button>
        </form>
      </div>
    );
  }
});

React.render(<ChatApp />, app);
