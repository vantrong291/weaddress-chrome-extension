#!/usr/bin/env bash
npm run build && cp -TRv dist/ ../extension/dist/ && cp -f index.html ../extension/
