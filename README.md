# @monolithed/use-script

[![Build Status](https://travis-ci.org/monolithed/use-script.png)](https://travis-ci.org/monolithed/use-script)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

A React hook to dynamically load scripts

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/use-script --save
```

**Yarn**:

```
yarn add @monolithed/use-script
```

## Basic usage

```typescript
import React, {FunctionComponent} from 'react';
import {useScript} from '@monolithed/use-script';

type Props = {
    src: string;
};

const LazyService: FunctionComponent<Props> = ({src}): JSX.Element => {
    const {loaded, failed, script} = useScript({src});
   
    return <div>script {script.src} is {loaded}</div>;
};
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
