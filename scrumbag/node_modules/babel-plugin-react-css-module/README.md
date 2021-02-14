### cssModule plugin

npm i babel-plugin-react-css-module

### feature

> see test/fixtures for realtime output

- [x] base

```jsx
// source
import './a.less';

<div className="home" onClick={() => null} />;
<div className="ho-me base" />;
<div className={x} />;
<div className={'home' + ' base c            xy' + ' ddd'} />;
<div className={'home'} />;
<div className={'home' + '-base' + x} />;
<div className={x('home')} />;

// dist
import _styles from './a.less';

function _rcm_style_fn(modules) {
  modules = modules || [];
  var a = {};
  modules.forEach(function(i) {
    if (i) {
      a = Object.assign(a, i);
    }
  });

  function h(k) {
    return a[k] || k;
  }

  return function(str) {
    return str
      .replace(/ +/g, ' ')
      .trim()
      .split(' ')
      .reduce(function(c, i) {
        if (!c) {
          c = h(i);
        } else {
          c += ' ' + h(i);
        }

        return c;
      }, null);
  };
}

var _rcm_style = _rcm_style_fn([_styles]);

<div className={_rcm_style('home')} onClick={() => null} />;
<div className={_rcm_style('ho-me base')} />;
<div className={_rcm_style(x)} />;
<div className={_rcm_style('home' + ' base c            xy' + ' ddd')} />;
<div className={_rcm_style('home')} />;
<div className={_rcm_style('home' + '-base' + x)} />;
<div className={_rcm_style(x('home'))} />;
```

- [x] multi

```jsx
// source
import './a.less';
import './b.less';

<div className="home" onClick={() => null} />;

// dist
import _styles from './a.less';
import _styles2 from './b.less';

function _rcm_style_fn(modules) {
  modules = modules || [];
  var a = {};
  modules.forEach(function(i) {
    if (i) {
      a = Object.assign(a, i);
    }
  });

  function h(k) {
    return a[k] || k;
  }

  return function(str) {
    return str
      .replace(/ +/g, ' ')
      .trim()
      .split(' ')
      .reduce(function(c, i) {
        if (!c) {
          c = h(i);
        } else {
          c += ' ' + h(i);
        }

        return c;
      }, null);
  };
}

var _rcm_style = _rcm_style_fn([_styles, _styles2]);

<div className={_rcm_style('home')} onClick={() => null} />;
```
