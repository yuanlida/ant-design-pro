import React, { Component } from 'react';

interface RichTextProps {
  className?: string;
  placeHolder?: string;
  maxRows?: number;
  lineHeight?: number;
  // keyMapping: any;
  onChange: any;
}

interface RichTextState {
  // listenKeys: Set<any>;
  // listenKeysMapping: Map<any, any>;
}

export class RichText extends Component<RichTextProps, RichTextState> {
  richText: HTMLDivElement | null = null;

  range: Range | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      // listenKeys: new Set<any>(),
      // listenKeysMapping: new Map<any, any>(),
    };
    this.richText = null;
    this.range = null;
  }

  componentDidMount(): void {
    // const { keyMapping = []} = this.props;
  }

  saveRange = (e: any) => {
    const sel = window.getSelection();
    if (sel !== null) {
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (range instanceof Range) {
          this.range = range;
        }
      }
    }
  };

  onInputChange = () => {
    const { onChange } = this.props;
    if (onChange && typeof onChange === 'function') {
      onChange(this.getNode());
    }
  };

  getNode = () => this.richText!.innerHTML;

  isAlive = () => {
    const sel = window.getSelection();
    if (sel != null) {
      if (
        sel.rangeCount > 0 &&
        (this.richText === sel.focusNode || this.richText!.contains(sel.focusNode))
      ) {
        return true;
      }
    }
    return false;
  };

  autoFocus = () => {
    if (this.isAlive()) {
      return;
    }
    this.richText!.focus();
  };

  addNode = (content: any) => {
    if (!content) {
      return;
    }
    let insertNode: any = null;
    if (content instanceof Node) {
      insertNode = content;
    } else if (typeof content === 'string') {
      insertNode = document.createTextNode(content);
    }
    this.autoFocus();
    const sel = window.getSelection();
    if (sel !== null) {
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const frag = document.createDocumentFragment();
        const lastNode = frag.appendChild(insertNode);
        range.insertNode(frag);
        const contentRange = range.cloneRange();
        contentRange.setStartAfter(lastNode);
        sel.removeAllRanges();
        sel.addRange(contentRange);
      }
    }
    this.onInputChange();
  };

  clearNode = () => {
    if (this.richText !== null) {
      this.richText.innerHTML = '';
    }
    this.onInputChange();
  };

  delNode = (n: any) => {
    this.autoFocus();
    const sel = window.getSelection();
    if (sel !== null) {
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        let newOffset = range.startOffset - n > 0 ? range.startOffset - n : 0;
        if (newOffset > range.startContainer.toString().length) {
          newOffset = range.startContainer.toString().length;
        }
        range.setStart(range.startContainer, newOffset);
        range.deleteContents();
        const contentRange = range.cloneRange();
        sel.removeAllRanges();
        sel.addRange(contentRange);
      }
    }
    this.onInputChange();
  };

  getInputText = () => {
    if (!this.isAlive()) {
      return '';
    }

    const sel = window.getSelection();
    if (sel !== null) {
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (range.startContainer.nodeType === 3) {
          const offset = range.startOffset;
          if (
            range !== null &&
            range.startContainer != null &&
            range.startContainer.nodeValue != null
          ) {
            return range.startContainer.nodeValue.slice(0, offset);
          }
        }
      }
    }
    return '';
  };

  render() {
    const { className, maxRows = 1, lineHeight = 30 } = this.props;
    return (
      <div
        className={className ? `rich-text-input ${className}` : 'rich-text-input'}
        style={{
          lineHeight: `${lineHeight}px`,
          maxHeight: `${17 + lineHeight * maxRows}px`,
          width: '200px',
          border: '1px solid #000',
        }}
        contentEditable
        suppressContentEditableWarning
        onSelect={this.saveRange}
        ref={el => {
          this.richText = el;
        }}
      />
    );
  }
}
