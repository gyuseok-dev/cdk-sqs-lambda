import { SQSEvent } from 'aws-lambda'


interface HitParams {
    userId: number
    key: string
    value: string
}

exports.handler = async (records: SQSEvent) => {
    const messageBody = JSON.parse(records.Records[0].body)
    const hitParams: HitParams = {
        userId: messageBody.userId,
        key: messageBody.key,
        value: messageBody.value
    }
    console.log('HitParams:', hitParams)
    // implement the logic to save the hit
}
