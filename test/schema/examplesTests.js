/**
 * Copyright 2018 F5 Networks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
const assert = require('assert');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
const baseSchema = require('../../schema/base.schema.json');
const networkSchema = require('../../schema/network.schema.json');
const systemSchema = require('../../schema/system.schema.json');

const validate = ajv
    .addSchema(networkSchema)
    .addSchema(systemSchema)
    .compile(baseSchema);

describe('examples tests', () => {
    it('should validate the basic example', () => {
        const data = JSON.parse(fs.readFileSync(`${__dirname}/../../examples/basic.json`).toString());
        assert.ok(validate(data), getErrorString());
    });
});

function getErrorString() {
    return JSON.stringify(validate.errors, null, 4);
}