import React, { Component } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import './CustomScrollbars.scss';

class CustomScrollbars extends Component {
    ref = React.createRef();

    getScrollLeft = () => {
        const scrollbars = this.ref.current;
        return scrollbars ? scrollbars.scrollLeft : 0;
    };

    getScrollTop = () => {
        const scrollbars = this.ref.current;
        return scrollbars ? scrollbars.scrollTop : 0;
    };

    scrollToBottom = () => {
        const scrollbars = this.ref.current;
        if (!scrollbars) return;
        scrollbars.scrollTo({
            top: scrollbars.scrollHeight,
            behavior: 'smooth',
        });
    };

    scrollTo = (targetTop) => {
        const scrollbars = this.ref.current;
        if (!scrollbars) return;

        if (this.props.quickScroll) {
            scrollbars.scrollTop = targetTop;
        } else {
            scrollbars.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
    };

    render() {
        const {
            className,
            disableVerticalScroll,
            disableHorizontalScroll,
            children,
            ...otherProps
        } = this.props;

        return (
            <Scrollbar
                ref={this.ref}
                noScrollY={disableVerticalScroll}
                noScrollX={disableHorizontalScroll}
                className={className ? `${className} custom-scrollbar` : 'custom-scrollbar'}
                {...otherProps}
                style={{ width: '100%', height: '100%' }} // tùy chỉnh theo nhu cầu
            >
                {children}
            </Scrollbar>
        );
    }
}

export default CustomScrollbars;