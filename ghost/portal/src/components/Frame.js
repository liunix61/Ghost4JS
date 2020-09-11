import React, {Component} from 'react';
import {createPortal} from 'react-dom';

export default class Frame extends Component {
    componentDidMount() {
        this.node.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setupFrameBaseStyle();
    };

    componentWillUnmout() {
        this.node.removeEventListener('load', this.handleLoad);
    }

    setupFrameBaseStyle() {
        this.iframeHtml = this.node.contentDocument.documentElement;
        this.iframeHead = this.node.contentDocument.head;
        this.iframeRoot = this.node.contentDocument.body;
        this.forceUpdate();
    }

    render() {
        const {children, head, title = '', style = {}, ...rest} = this.props;
        return (
            <iframe srcDoc={`<!DOCTYPE html>`} {...rest} ref={node => (this.node = node)} title={title} style={style} frameBorder="0">
                {this.iframeHead && createPortal(head, this.iframeHead)}
                {this.iframeRoot && createPortal(children, this.iframeRoot)}
            </iframe>
        );
    }
}
