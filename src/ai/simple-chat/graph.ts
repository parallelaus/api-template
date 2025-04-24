/**
 * Graph defines the chat graph chain
 */
import { END, START, StateGraph } from '@langchain/langgraph'
import { MessagesAnnotation } from '@langchain/langgraph'
import { callModel } from './nodes'

// Define graph
const graph = new StateGraph(MessagesAnnotation)
  .addNode('callModel', callModel)
  .addEdge(START, 'callModel')
  .addEdge('callModel', END)

// Export compiled graph
export default graph.compile()
