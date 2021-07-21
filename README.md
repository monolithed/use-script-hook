# @monolithed/use-script-hook

[![Build Status](https://travis-ci.org/monolithed/use-script-hook.png)](https://travis-ci.org/monolithed/use-script-hook)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

A React hook to dynamically load scripts

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/use-script-hook --save
```

**Yarn**:

```
yarn add @monolithed/use-script-hook
```

## Basic usage

```typescript
import React, {FunctionComponent} from 'react';
import {useScript} from '@monolithed/use-script-hook';

type Props = {
    src: string;
};

const LazyService: FunctionComponent<Props> = ({src}): JSX.Element => {
    const {loaded, failed, script} = useScript({src});
   
    return <div>script {script.src} is {loaded}</div>;
};
```

## Attributes

**async** (default is true)
**src** (required)

```typescript
const {loaded, failed} = useScript({src, async});
```

## Options

**verbose** — a boolean indicator of sending states to the console

```typescript
const {loaded, failed} = useScript({src}, {verbose: true});
```

## Tests

```
npm test
```

## Publishing

```
npm publish --access public --verbose
```

## License

MIT

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.
